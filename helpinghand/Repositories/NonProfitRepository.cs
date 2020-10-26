using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using helpinghand.Models;
using helpinghand.Utils;

namespace helpinghand.Repositories
{
    public class NonProfitRepository : BaseRepository, INonProfitRepository
    {
        public NonProfitRepository(IConfiguration configuration) : base(configuration) { }

        public List<NonProfit> GetAllNonProfits()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT n.Id, n.OwnerId, n.Name, n.Location, n.Cause, n.Description, n.MissionStatement,
                                   n.website, up.FirstName, up.LastName, up.DisplayName, up.Email
                            FROM NonProfit n
                            LEFT JOIN UserProfile up on n.OwnerId = up.Id
                                       ";
                    var reader = cmd.ExecuteReader();

                    var nonProfits = new List<NonProfit>();

                    while (reader.Read())
                    {
                        nonProfits.Add(new NonProfit()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            OwnerId = DbUtils.GetInt(reader, "OwnerId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Location = DbUtils.GetString(reader, "Location"),
                            Cause = DbUtils.GetString(reader, "Cause"),
                            Description = DbUtils.GetString(reader, "Description"),
                            MissionStatement = DbUtils.GetString(reader, "MissionStatement"),
                            Website = DbUtils.GetString(reader, "website"),
                            UserProfile = new UserProfile ()
                            {
                                Id = DbUtils.GetInt(reader, "OwnerId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email")
                            }
                        });
                    }

                    reader.Close();

                    return nonProfits;
                }
            }
        }

    }
}
