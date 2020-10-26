using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using helpinghand.Models;
using helpinghand.Repositories;

namespace helpinghand.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NonProfitController : Controller
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly INonProfitRepository _nonProfitRepository;

        public NonProfitController(INonProfitRepository nonProfitRepository, IUserProfileRepository userProfileRepository)
        {
            _nonProfitRepository = nonProfitRepository;
            _userProfileRepository = userProfileRepository;
        }
        //get all nonprofits
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_nonProfitRepository.GetAllNonProfits());
        }
    }
}
