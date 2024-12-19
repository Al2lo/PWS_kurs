using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VeloMap.Application.EventService.Configuration
{
    public class JwtOption
    {
        public string Audience { get; set; } = String.Empty;
        public string Issuer { get; set; } = String.Empty;
        public int Expires { get; set; }
        public string SecretAccess { get; set; } = String.Empty;
        public string SecretRefresh { get; set; } = String.Empty;
    }
}
