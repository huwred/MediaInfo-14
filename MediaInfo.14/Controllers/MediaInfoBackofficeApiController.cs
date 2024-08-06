using System.Xml.Linq;
using MetadataExtractor;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Umbraco.Cms.Web.Common;
using Umbraco.Extensions;
using Umbraco.StorageProviders.AzureBlob;
using Microsoft.Extensions.Logging;


namespace MediaInfo.Controllers
{
    [ApiController]
    public class MediaInfoBackofficeApiController : Controller
    {

        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UmbracoHelper _umbracoHelper;
        private readonly ILogger<MediaInfoBackofficeApiController> _logger;

        public MediaInfoBackofficeApiController(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContext,UmbracoHelper umbracoHelper, ILogger<MediaInfoBackofficeApiController> logger)
        {
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContext;
            _umbracoHelper = umbracoHelper;
            _logger = logger;
        }

        [HttpGet]
        [Route("exiffiledata/{id}")]
        [Produces("application/json")]
        public IActionResult GetFileInfo(string id)
        {
            try
            {
                var imagefile = _umbracoHelper.Media(Guid.Parse(id));
                if(imagefile == null) {
                    return BadRequest($"MediaInfo: No image file {id}");
                }
                var filePath = _webHostEnvironment.WebRootPath + imagefile.Url();
                var fileInfo = _webHostEnvironment.WebRootFileProvider.GetFileInfo(imagefile.Url());
                if(fileInfo.Exists && fileInfo is not AzureBlobItemInfo)
                {
                    var directories = ImageMetadataReader.ReadMetadata(filePath);
                    var doc = new XDocument(
                        new XElement("Metadata",
                            directories.Where(d=>d.Name.StartsWith("Exif") || d.Name.Contains("GPS")).Select(directory =>
                                new XElement("Directory",
                                    new XAttribute("Name", directory.Name),
                                    directory.Tags.Select(tag =>
                                        new XElement("Tag",
                                            new XAttribute("Id", tag.Type.ToString("X")),
                                            new XAttribute("Name", tag.Name),
                                            tag.Description))))));
                    var json = JsonConvert.SerializeXNode(doc);
                    var jObject = JObject.Parse(json);

                    return Ok(json);
                }
                else
                {
                    return GetFileInfoAzure(imagefile.Url());
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e,$"MediaInfo: Error loading Exif data from file {id}");
                return BadRequest($"MediaInfo: Error loading Exif data from file {id}");
            }

        }

        private IActionResult GetFileInfoAzure(string apiInstruction)
        {
            try
            {
                var baseUrl = _httpContextAccessor.HttpContext.Request.Scheme + "://" + _httpContextAccessor.HttpContext.Request.Host;
                using var client = new HttpClient();
                using var response = client.GetAsync(baseUrl + apiInstruction).Result;
                using var content = response.Content;
                using var stream = content.ReadAsStreamAsync().Result;

                if(stream.Length > 0)
                {
                    var directories = ImageMetadataReader.ReadMetadata(stream);
                    var doc = new XDocument(
                        new XElement("Metadata",
                            directories.Where(d=>d.Name.StartsWith("Exif") || d.Name.Contains("GPS")).Select(directory =>
                                new XElement("Directory",
                                    new XAttribute("Name", directory.Name),
                                    directory.Tags.Select(tag =>
                                        new XElement("Tag",
                                            new XAttribute("Id", tag.Type.ToString("X")),
                                            new XAttribute("Name", tag.Name),
                                            tag.Description))))));
                    var json = JsonConvert.SerializeXNode(doc);
                    var jObject = JObject.Parse(json);

                    return Ok(json);
                }
                else
                {
                    return Ok($"MediaInfo: no filestream {apiInstruction}");
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e,$"MediaInfo: Error loading Exif data from file {apiInstruction}");
                return BadRequest($"MediaInfo: Error loading Exif data from file {apiInstruction}");
            }            
        }
    }
}
