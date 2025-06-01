using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling_Backend.Models;

namespace Scheduling_Backend.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}