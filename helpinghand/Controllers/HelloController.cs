using Microsoft.AspNetCore.Mvc;

namespace helpinghand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public IActionResult Hello()
        {
            return Content("hello");
        }
    }
}
