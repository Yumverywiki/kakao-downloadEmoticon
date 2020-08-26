function decompress(zip_path, dir_path) {
  var zipFile = new java.io.File(zip_path);
  var fileInputStream = new java.io.FileInputStream(zipFile);
  var zipInputStream = new java.util.zip.ZipInputStream(fileInputStream);
  try {
    while ((zipentry = zipInputStream.getNextEntry()) != null) {
      var fileName = zipentry.getName();
      var file = new java.io.File(dir_path, fileName);
      if (zipentry.isDirectory()) {
        file.mkdirs();
      } else {
        var parentDir = new java.io.File(file.getParent());
        if (!parentDir.exists()) {
          parentDir.mkdirs();
        }
        try {
          var fos = new java.io.FileOutputStream(file);
          var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 256);
          var size = 0;
          while ((size = zipInputStream.read(buf)) > 0) {
            fos.write(buf, 0, size);
          }
        } catch(e) {
          throw new Error(e);
        }
      }
    }
  } catch(e) {
    throw new Error(e);
  } finally {
    if (zipInputStream != null) zipInputStream.close();
    if (fileInputStream != null) fileInputStream.close();
  }
  return true;
}

function download(file_path, dir_path, emticon_id) {
  var dir = new java.io.File(file_path.replace(file_path.split("/")[file_path.split("/").length - 1], ""));
  if (!dir.exists()) {
    dir.mkdirs();
  }
  var dir1 = new java.io.File(dir_path);
  if (!dir1.exists()) {
    dir1.mkdirs();
  }
  var file = new java.io.File(file_path);
  var fileOutPutStream = new java.io.FileOutputStream(file);
  var data = org.jsoup.Jsoup.connect("https://item.kakaocdn.net/dw/" + emticon_id + ".thum_pack.zip").ignoreContentType(true).execute().bodyAsBytes();
  fileOutPutStream.write(data);
  fileOutPutStream.close();
  decompress(file_path, dir_path);
  return true;
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg.startsWith("/download ") == true) {
    download("/sdcard/test/ss/" + msg.split("/download ")[1] + ".thum_pack_x3.zip", "/sdcard/test/as", msg.split("/download ")[1]);
  }
}
