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
        //add need
        [HttpPost]
        public IActionResult Post(Event Event)
        {
            _eventRepository.Add(Event);
            return CreatedAtAction("Get", new { id = Event.Id }, Event);
        }
        //update need
        [HttpPut("{Id}")]

        public IActionResult Put(int Id, Event Event)
        {
            if (Id != Event.Id)
            {
                return BadRequest();
            }
            _eventRepository.Update(Event);
            return Ok();
        }
        //delete need
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _eventRepository.Delete(id);
            return NoContent();
        }
        //get event by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var Event = _eventRepository.GetEventById(id);
            if (Event == null)
            {
                return NotFound();
            }
            return Ok(Event);
        }
        //get event by NonProfitid
        [HttpGet("NPevent/{NonProfitid}")]
        public IActionResult GetEventByNonProfitId(int NonProfitId)
        {
            return Ok(_eventRepository.GetEventByNonProfitId(NonProfitId));
        }
    }
}
