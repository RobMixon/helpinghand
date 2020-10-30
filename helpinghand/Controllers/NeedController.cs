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
    public class NeedController : Controller
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly INonProfitRepository _nonProfitRepository;
        private readonly INeedRepository _needRepository;

        public  NeedController(INeedRepository needRepository, INonProfitRepository nonProfitRepository, IUserProfileRepository userProfileRepository)
        {
            _needRepository = needRepository;
            _nonProfitRepository = nonProfitRepository;
            _userProfileRepository = userProfileRepository;
        }
        //get all needs
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_needRepository.GetAllNeeds());
        }
        //add need
        [HttpPost]
        public IActionResult Post(Need Need)
        {
            _needRepository.Add(Need);
            return CreatedAtAction("Get", new { id = Need.Id }, Need);
        }
        //update need
        [HttpPut("{Id}")]

        public IActionResult Put(int Id, Need need)
        {
            if (Id != need.Id)
            {
                return BadRequest();
            }
            _needRepository.Update(need);
            return Ok();
        }
        //delete need
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _needRepository.Delete(id);
            return NoContent();
        }
        //get need by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var Need = _needRepository.GetNeedById(id);
            if (Need == null)
            {
                return NotFound();
            }
            return Ok(Need);
        }
        //get need by NonProfitid
        [HttpGet("NPneed/{NonProfitid}")]
        public IActionResult GetByNonProfitId(int NonProfitId)
        {
            return Ok(_needRepository.GetByNonProfitId(NonProfitId));
        }
    }
}
