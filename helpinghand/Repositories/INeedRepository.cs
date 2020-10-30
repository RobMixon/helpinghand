using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using helpinghand.Models;

namespace helpinghand.Repositories
{
    public interface INeedRepository
    {
        List<Need> GetAllNeeds();
        void Add(Need need);
        Need GetNeedById(int id);
        List<Need> GetByNonProfitId(int NonProfitid);
        void Delete(int id);
        void Update(Need need);
    }
}
