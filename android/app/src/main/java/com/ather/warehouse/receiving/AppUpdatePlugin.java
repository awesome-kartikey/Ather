package com.ather.warehouse.receiving;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;

@CapacitorPlugin(name = "AppUpdate")
public class AppUpdatePlugin extends Plugin {

    @PluginMethod
    public void installApk(PluginCall call) {
        String downloadUrl = call.getString("url");
        if (downloadUrl == null || downloadUrl.trim().isEmpty()) {
            call.reject("Download URL is required");
            return;
        }

        Context context = getContext();

        // On Android 8.0+ (API 26+), check permission to install unknown apps
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            if (!context.getPackageManager().canRequestPackageInstalls()) {
                Intent reqIntent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES);
                reqIntent.setData(Uri.parse("package:" + context.getPackageName()));
                reqIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(reqIntent);
                call.reject("PERMISSION_NEEDED: Please toggle 'Allow from this source' and click Update again.");
                return;
            }
        }

        try {
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downloadUrl));
            request.setTitle("Floor Trainer Update");
            request.setDescription("Downloading latest warehouse training APK...");
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);

            File targetDir = context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
            if (targetDir == null) {
                targetDir = context.getFilesDir();
            }
            File destinationFile = new File(targetDir, "floor_trainer_update.apk");
            if (destinationFile.exists()) {
                destinationFile.delete();
            }
            request.setDestinationUri(Uri.fromFile(destinationFile));

            DownloadManager manager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            if (manager == null) {
                call.reject("Download manager service is not available on this device.");
                return;
            }

            final long downloadId = manager.enqueue(request);

            BroadcastReceiver onComplete = new BroadcastReceiver() {
                @Override
                public void onReceive(Context c, Intent intent) {
                    long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                    if (id == downloadId) {
                        try {
                            context.unregisterReceiver(this);
                        } catch (Exception ignored) {}

                        try {
                            Intent installIntent = new Intent(Intent.ACTION_VIEW);
                            Uri apkUri = FileProvider.getUriForFile(
                                context,
                                context.getPackageName() + ".fileprovider",
                                destinationFile
                            );
                            installIntent.setDataAndType(apkUri, "application/vnd.android.package-archive");
                            installIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                            installIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            context.startActivity(installIntent);

                            JSObject ret = new JSObject();
                            ret.put("status", "installer_launched");
                            call.resolve(ret);
                        } catch (Exception err) {
                            call.reject("Failed to trigger Android installer: " + err.getMessage());
                        }
                    }
                }
            };

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                context.registerReceiver(onComplete, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE), Context.RECEIVER_EXPORTED);
            } else {
                context.registerReceiver(onComplete, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
            }

            JSObject started = new JSObject();
            started.put("status", "download_started");
            started.put("downloadId", downloadId);
            // Notify frontend that download is enqueued
        } catch (Exception e) {
            call.reject("Download failed: " + e.getMessage());
        }
    }
}
