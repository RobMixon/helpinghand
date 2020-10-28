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
        //add nonprofit
        [HttpPost]
        public IActionResult Post(NonProfit NonProfit)
        {
            var currentUserProfile = GetCurrentUserProfile();
            NonProfit.OwnerId = currentUserProfile.Id;
            _nonProfitRepository.Add(NonProfit);
            return CreatedAtAction("Get", new { id = NonProfit.Id }, NonProfit);
        }
        //gets current user profile
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
        //update nonprofit
        [HttpPut("{Id}")]

        public IActionResult Put(int Id, NonProfit nonProfit)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var NonProfitFromDB = _nonProfitRepository.GetNonProfitById(Id);
            if (NonProfitFromDB.OwnerId == currentUserProfile.Id)
            {
                _nonProfitRepository.Update(nonProfit);
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
        //get nonprofit by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var NonProfit = _nonProfitRepository.GetNonProfitById(id);
            if (NonProfit == null)
            {
                return NotFound();
            }
            return Ok(NonProfit);
        }

        //delete nonprofit
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var NonProfit = _nonProfitRepository.GetNonProfitById(id);

            if (NonProfit.OwnerId == currentUserProfile.Id)
            {
                _nonProfitRepository.Delete(id);
                return NoContent();
            }

            else
            {
                return Unauthorized();
            }
        }
    }
}
