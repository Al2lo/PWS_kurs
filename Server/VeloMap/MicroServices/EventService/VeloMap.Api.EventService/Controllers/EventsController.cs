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


    }
}
