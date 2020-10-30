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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly INonProfitRepository _nonProfitRepository;
        private readonly INeedRepository _needRepository;

        public EventController(IEventRepository eventRepository  ,INeedRepository needRepository, INonProfitRepository nonProfitRepository, IUserProfileRepository userProfileRepository)
        {
            _eventRepository = eventRepository;
            _needRepository = needRepository;
            _nonProfitRepository = nonProfitRepository;
            _userProfileRepository = userProfileRepository;
        }

        //get all events
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_eventRepository.GetAllEvents());
        }

    }
}
