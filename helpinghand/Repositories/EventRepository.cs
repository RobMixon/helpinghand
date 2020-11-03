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
        //add
        public void Add(Event Event)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Event (NonProfitId, Name, CreateDateTime, Description, 
                                          Location, Comments)
                        OUTPUT INSERTED.ID
                        VALUES (@NonProfitId, @Name, @CreateDateTime, @Description,
                                 @Location, @Comments)";

                    DbUtils.AddParameter(cmd, "@NonProfitId", Event.NonProfitId);
                    DbUtils.AddParameter(cmd, "@Name", Event.Name);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", Event.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Description", Event.Description);
                    DbUtils.AddParameter(cmd, "@Location", Event.Location);
                    DbUtils.AddParameter(cmd, "@Comments", Event.Comments);

                    Event.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        //update
        public void Update(Event Event)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Event
                           SET NonProfitId = @NonProfitId,
                               Name = @Name,
                               CreateDateTime = @CreateDateTime,
                               Description = @Description,
                               Location = @Location,
                               Comments = @Comments
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@NonProfitId", Event.NonProfitId);
                    DbUtils.AddParameter(cmd, "@Name", Event.Name);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", Event.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Description", Event.Description);
                    DbUtils.AddParameter(cmd, "@Location", Event.Location);
                    DbUtils.AddParameter(cmd, "@Comments", Event.Comments);
                    DbUtils.AddParameter(cmd, "@Id", Event.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        //delete
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM Event
                                        WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        //get by id
        public Event GetEventById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT n.Id, n.NonProfitId, n.Name as EventName, 
                                    n.CreateDateTime, n.Description, n.Location AS EventLocation,
                                   n.Comments, np.OwnerId, np.Name, np.Location, np.Cause, np.Description, np.MissionStatement,
                                   np.Website
                            FROM Event n
                            LEFT JOIN NonProfit np on n.NonProfitId = np.Id
                                        WHERE n.Id = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Event Event = null;
                    if (reader.Read())
                    {
                        Event = new Event()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            NonProfitId = DbUtils.GetInt(reader, "NonProfitId"),
                            Name = DbUtils.GetString(reader, "EventName"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Location = DbUtils.GetString(reader, "EventLocation"),
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
                        };
                    }

                    reader.Close();

                    return Event;
                }
            }
        }
        //get event by NonProfitid
        public List<Event> GetEventByNonProfitId(int NonProfitId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT n.Id, n.NonProfitId, n.Name AS EventName, n.CreateDateTime, n.Description, n.Location AS EventLocation,
                                   np.OwnerId, np.Name, np.Location, np.Cause, np.Description, np.MissionStatement,
                                   np.Website
                            FROM Event n
                            LEFT JOIN NonProfit np on n.NonProfitId = np.Id
                                        WHERE n.NonProfitId = @NonProfitId;";

                    DbUtils.AddParameter(cmd, "@NonProfitId", NonProfitId);

                    var reader = cmd.ExecuteReader();

                    var Events = new List<Event>();
                    while (reader.Read())
                    {
                        Events.Add(new Event()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            NonProfitId = DbUtils.GetInt(reader, "NonProfitId"),
                            Name = DbUtils.GetString(reader, "EventName"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Location = DbUtils.GetString(reader, "EventLocation"),
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

                    return Events;
                }
            }
        }
    }
    }
