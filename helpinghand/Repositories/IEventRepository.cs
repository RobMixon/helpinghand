using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using helpinghand.Models;

namespace helpinghand.Repositories
{
    public interface IEventRepository
    {
        List<Event> GetAllEvents();
        void Add(Event Event);
        Event GetEventById(int id);
        List<Event> GetEventByNonProfitId(int NonProfitid);
        void Delete(int id);
        void Update(Event Event);
    }
}
