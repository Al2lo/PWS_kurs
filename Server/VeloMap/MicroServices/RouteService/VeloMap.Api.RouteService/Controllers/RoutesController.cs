using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VeloMap.Application.RouteService.DTOs.CommentDTO;
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
        private readonly ICommentService _commentService;

        public RoutesController(IRouteService routeService, ICommentService commentService)
        {
            _routeService = routeService;
            _commentService = commentService;
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

        [Authorize]
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

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateRouteAsync([FromBody] CreateRouteDto createRoute, CancellationToken token)
        {
            var id = await _routeService.CreateRouteAsync(createRoute, token);
            return Ok(new { id });
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateRouteAsync([FromBody] UpdateRotueDto updateRoute)
        {
            await _routeService.UpdateRouteAsync(updateRoute);

            return Ok();
        }

        [Authorize]
        [HttpPost("favorite")]
        public async Task<IActionResult> CreateFavoriteRouteAsync([FromBody] CreateFavoriteRouteDto createFavoriteRouteDto, CancellationToken token)
        {
            await _routeService.CreateFovoriteRouteAsync(createFavoriteRouteDto, token);

            return Ok();
        }

        [Authorize]
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
            var userRole = User?.FindFirst("Role")?.Value;
            if(userRole != null && int.Parse(userRole) != 0)
            {
                var userId = User?.FindFirst("userId")?.Value;
                if (userId == null)
                    throw new Exception("User not found");

                await _routeService.DeleteRouteAsync(routeId, int.Parse(userId));
            }
            else
                await _routeService.DeleteRouteByAdminAsync(routeId);

            return Ok();
        }

        [Authorize]
        [HttpGet("{routeId:int}/comments")]
        public async Task<IActionResult> GetCommentsAsync(int routeId)
        {
            var comments = await _commentService.GetCommentsAsync(routeId);

            return Ok(comments);
        }

        [Authorize]
        [HttpPost("{routeId:int}/comments")]
        public async Task<IActionResult> CreateCommentsAsync(int routeId, [FromBody] CreateCommentDto createCommentDto, CancellationToken token)
        {
            await _commentService.CreateCommentAsync(routeId, createCommentDto, token);

            return Ok();
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpGet("All")]
        public async Task<ActionResult<RouteDto>> GetAllRoutesAsync()
        {
            var routes = await _routeService.GetAllRoutesAsync();

            return Ok(routes);
        }
    }
}
