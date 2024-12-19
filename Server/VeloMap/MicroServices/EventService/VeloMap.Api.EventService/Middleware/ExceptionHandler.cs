using System.Net;
using System.Text.Json;

namespace VeloMap.Api.EventService.Middleware
{
    public class ExceptionHandler
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandler> _logger;
        public ExceptionHandler(RequestDelegate next, ILogger<ExceptionHandler> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex.Message, HttpStatusCode.BadRequest, ex.Message);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, string exceptionMsg, HttpStatusCode httpStatusCode, string message)
        {
            _logger.LogError(exceptionMsg);

            HttpResponse response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)httpStatusCode;

            var errorDTO = new
            {
                Message = message,
                StatusCode = (int)httpStatusCode
            };

            await response.WriteAsJsonAsync(JsonSerializer.Serialize(errorDTO));
        }
    }
}
