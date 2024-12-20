﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VeloMap.Application.EventService.Services;
using VeloMap.Application.EventService.Services.Interfaces;

namespace VeloMap.Api.EventService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _eventService;
        public EventsController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [Authorize]
        [HttpGet("open")]
        public async Task<IActionResult> GetOpenedEventsAsync()
        {
            var userIdClaim = User?.FindFirst("userId");

            if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized(new { message = "Token is not valid or missing!" });
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest(new { message = "Invalid userId in token!" });
            }

            var events = await _eventService.GetOpenedEventsAsync(userId);

            return Ok(events);
        }

        [Authorize]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] int eventId, CancellationToken token)
        {
            var userIdClaim = User?.FindFirst("userId");

            if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized(new { message = "Token is not valid or missing!" });
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest(new { message = "Invalid userId in token!" });
            }

            await _eventService.RegisterUserAsync(userId, eventId, token);

            return Ok();
        }

        [Authorize]
        [HttpPost("checkOut")]
        public async Task<IActionResult> CheckOutAsync([FromBody] int eventId, CancellationToken token)
        {
            var userIdClaim = User?.FindFirst("userId");

            if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized(new { message = "Token is not valid or missing!" });
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest(new { message = "Invalid userId in token!" });
            }

            await _eventService.CheckoutUserAsync(userId, eventId, token);

            return Ok();
        }
    }
}