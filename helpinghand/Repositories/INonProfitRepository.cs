using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using helpinghand.Models;

namespace helpinghand.Repositories
{
    public interface INonProfitRepository
    {
        List<NonProfit> GetAllNonProfits();
        void Add(NonProfit nonProfit);
        NonProfit GetNonProfitById(int id);
        void Delete(int id);
        void Update(NonProfit nonProfit);
    }
}
