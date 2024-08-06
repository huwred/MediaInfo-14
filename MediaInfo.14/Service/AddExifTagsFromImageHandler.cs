using MetadataExtractor;
using MetadataExtractor.Formats.Exif;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using Directory = MetadataExtractor.Directory;

namespace MediaInfo.Core.Service;

public class AddExifTagsFromImageHandler : INotificationHandler<MediaSavingNotification>
{
    private readonly ILogger<AddExifTagsFromImageHandler> _logger;
    private readonly MediaFileManager _mediaFileManager;

    public AddExifTagsFromImageHandler(ILogger<AddExifTagsFromImageHandler> logger, MediaFileManager mediaFileManager)
    {
        _logger = logger;
        _mediaFileManager = mediaFileManager;

    }

    /// <summary>
    /// If the Media item (Image) has any exif properties added, parse any exif data in
    /// the image and update the exif properties.
    /// 
    /// Properties currently supported
    /// exifLocation - GPS Latitude,Longitude
    /// exifCreatedDate - Original created date
    /// 
    /// </summary>
    /// <param name="notification"></param>
    public void Handle(MediaSavingNotification notification)
    {
        foreach (var mediaItem in notification.SavedEntities)
        {
            //Only process Images
            if (mediaItem.ContentType.Alias.Equals("Image"))
            {
                if (!mediaItem.HasIdentity)
                {
                    _logger.LogDebug($"Sending {mediaItem.Name} to GetExifData");
                    try
                    {
                        Dictionary<string, string>? exIfTags = GetExifData(mediaItem);
                        //loop through any properties where the alias starts with "exif"
                        foreach (var exifProperty in mediaItem.Properties.Where(p => p.Alias.StartsWith("exif")))
                        {
                            //if there is a matching exifTag set the exifProperty value
                            if(exIfTags != null && exIfTags.ContainsKey(exifProperty.Alias)) {
                                mediaItem.SetValue(exifProperty.Alias, exIfTags[exifProperty.Alias]); 
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        _logger.LogError(e,$"Error fetching Exif data");
                    }
                }
            }
        }
    }
    /// <summary>
    /// Parse the image Exif data
    /// </summary>
    /// <param name="publishedItem">The MediaItem(Image) to parse</param>
    /// <returns>Dictionary of Exif Tags</returns>
    private Dictionary<string, string>? GetExifData(IMedia publishedItem)
    {
        var tags = new Dictionary<string, string>();
        try
        {
            _logger.LogDebug($"Load MediaFile into Stream");
            using (Stream stream = _mediaFileManager.GetFile(publishedItem, out string? mediaFilePath))
            {
                _logger.LogDebug($"MediaFile {mediaFilePath} Loaded");
                IEnumerable<Directory> directories = ImageMetadataReader.ReadMetadata(stream);
                var subIfdDirectory = directories.OfType<ExifSubIfdDirectory>().FirstOrDefault();
                var jpgInfo = directories.OfType<ExifIfd0Directory>().FirstOrDefault();
                var gpsDirectory = directories.OfType<GpsDirectory>().FirstOrDefault();
                if (gpsDirectory != null)
                {
                    _logger.LogDebug($"Found {publishedItem.Name} gpsDirectory");
                    var gpsLoc = gpsDirectory?.GetGeoLocation();
                    if(gpsLoc != null)
                    {
                        tags.Add("exifLocation", gpsLoc.ToString());
                    }
                }
                if (subIfdDirectory != null && subIfdDirectory.ContainsTag(ExifDirectoryBase.TagDateTimeOriginal))
                {
                    _logger.LogDebug($"Found {publishedItem.Name} TagDateTimeOriginal");
                    var dateStr = subIfdDirectory?.GetDescription(ExifDirectoryBase.TagDateTimeOriginal);
                    if (dateStr != null)
                    {
                        tags.Add("exifCreatedDate", dateStr);
                    }
                }
                if (jpgInfo != null && !tags.ContainsKey("exifCreatedDate"))
                {
                    _logger.LogDebug($"Found {publishedItem.Name} jpgInfo");
                    var dateStr = jpgInfo?.GetDescription(ExifDirectoryBase.TagDateTime);
                    if(dateStr != null)
                    {
                        tags.Add("exifCreatedDate", dateStr);
                    }  
                }
            }
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Error Loading MediaFile");
            return null;
        }
        return tags;
    }

}