﻿# Media Info

## 14.0.1
Fixed small issue when displaying error.

## 14.0.0 
A content app for umbraco which displays the Exif Info from your media items such as the GPS and Camera details

![image](https://raw.githubusercontent.com/huwred/MediaInfo-14/main/images/mediamenu.jpg?raw=true)

![image](https://raw.githubusercontent.com/huwred/MediaInfo-14/main/images/mediainfo.jpg?raw=true)

## OnSave Notification ##

The package can also be used to update some custom properties on the Media item. You need to add 2 text properties to the Image MediaType
* exifLocation
* exifCreatedDate

To enable this, you need to add
```.AddNotificationHandler<MediaSavingNotification, AddExifTagsFromImageHandler>()```
to your program.cs file. When you now upload image files, if they contain GPS data and/or the original creation date, the properties will be updated.
