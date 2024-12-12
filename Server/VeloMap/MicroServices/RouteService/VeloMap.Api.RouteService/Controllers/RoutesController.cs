using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VeloMap.Application.RouteService.DTOs.RouteDTO;
using VeloMap.Application.RouteService.Services.Interfaces;

namespace VeloMap.Api.RouteService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        private readonly IRouteService _routeService;

        public RoutesController(IRouteService routeService)
        {
            _routeService = routeService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Route>>> GetPublicRoutesAsync()
        {
            var publicRoutes = await _routeService.GetPublicRoutesAsync();
            return Ok(publicRoutes);
        }

        [HttpPost]
        public async Task<ActionResult> CreateRouteAsync([FromBody] CreateRouteDTO createRoute, CancellationToken token)
        {
            await _routeService.CreateRouteAsync(createRoute, token);
            return Ok();
        }
    }
}
