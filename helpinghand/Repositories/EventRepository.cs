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
    public class EventRepository : BaseRepository, IEventRepository 
    {
        public EventRepository(IConfiguration configuration) : base(configuration) { }
        //get all events
        public List<Event> GetAllEvents()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT e.Id, e.NonProfitId, e.Name AS EventName, e.CreateDateTime, e.Description, e.Location AS EventLocation,
                                   e.Comments, np.OwnerId, np.Name, np.Location, np.Cause, 
                                   np.Description, np.MissionStatement,
                                   np.Website
                            FROM Event e
                            LEFT JOIN NonProfit np on e.NonProfitId = np.Id
                                       ";
                    var reader = cmd.ExecuteReader();

                    var events = new List<Event>();

                    while (reader.Read())
                    {
                        events.Add(new Event()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            NonProfitId = DbUtils.GetInt(reader, "NonProfitId"),
                            Name = DbUtils.GetString(reader, "EventName"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Location = DbUtils.GetString(reader, "EventLocation"),
                            Comments = DbUtils.GetString(reader, "Comments"),
                            NonProfit = new NonProfit()
                            {
                                Id = DbUtils.GetInt(reader, "NonProfitId"),
                                OwnerId = DbUtils.GetInt(reader, "OwnerId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Location = DbUtils.GetString(reader, "Location"),
                                Cause = DbUtils.GetString(reader, "Cause"),
                                Description = DbUtils.GetString(reader, "Description"),
                                MissionStatement = DbUtils.GetString(reader, "MissionStatement"),
                                Website = DbUtils.GetString(reader, "Website")
                            }
                        });
                    }

                    reader.Close();

                    return events;
                }
            }
        }
    }
}
