using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VeloMap.Application.RouteService.DTOs.FavoriteRouteDTO;
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

        [HttpGet("public")]
        public async Task<ActionResult<List<Route>>> GetPublicRoutesAsync()
        {
            var publicRoutes = await _routeService.GetPublicRoutesAsync();

            return Ok(publicRoutes);
        }

        [HttpGet("favorities")]
        public async Task<ActionResult<List<Route>>> GetFavoriteRoutesAsync([FromQuery] int userId)
        {
            var favoriteRoutes = await _routeService.GetFavoriteRoutesAsync(userId);

            return Ok(favoriteRoutes);
        }

        [HttpGet("user")]
        public async Task<ActionResult<List<Route>>> GetUserRoutesAsync([FromQuery] int userId)
        {
            var routes = await _routeService.GetUserRoutesAsync(userId);

            return Ok(routes);
        }

        [HttpGet]
        public async Task<ActionResult<RouteDto>> GetRouteAsync([FromQuery] int id, [FromQuery] int userId)
        {
            var routes = await _routeService.GetRouteAsync(id, userId);

            return Ok(routes);
        }

        [HttpPost]
        public async Task<ActionResult> CreateRouteAsync([FromBody] CreateRouteDto createRoute, CancellationToken token)
        {
            var id = await _routeService.CreateRouteAsync(createRoute, token);
            return Ok(new { id });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRouteAsync([FromBody] UpdateRotueDto updateRoute)
        {
            await _routeService.UpdateRouteAsync(updateRoute);

            return Ok();
        }

        [HttpPost("favorite")]
        public async Task<IActionResult> CreateFavoriteRouteAsync([FromBody] CreateFavoriteRouteDto createFavoriteRouteDto, CancellationToken token)
        {
            await _routeService.CreateFovoriteRouteAsync(createFavoriteRouteDto, token);

            return Ok();
        }

        [HttpDelete("favorite")]
        public async Task<IActionResult> DeleteFavoriteRouteAsync([FromQuery] CreateFavoriteRouteDto createFavoriteRouteDto)
        {
            await _routeService.DeleteFovoriteRouteAsync(createFavoriteRouteDto);

            return Ok();
        }

        [Authorize]
        [HttpDelete()]
        public async Task<IActionResult> DeleteRouteAsync([FromQuery] int routeId)
        {
            var userId = User?.FindFirst("userId")?.Value;
            if (userId == null)
                throw new Exception("User not found");

            await _routeService.DeleteRouteAsync(routeId, int.Parse(userId));

            return Ok();
        }
    }
}
