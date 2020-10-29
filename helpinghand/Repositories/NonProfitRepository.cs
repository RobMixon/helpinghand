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
        public void Add(NonProfit nonProfit)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO NonProfit (OwnerId, Name, Location, Cause, 
                                          Description, MissionStatement, Website)
                        OUTPUT INSERTED.ID
                        VALUES (@OwnerId, @Name, @Location, @Cause, @Description,
                                 @MissionStatement, @Website)";

                    DbUtils.AddParameter(cmd, "@OwnerId", nonProfit.OwnerId);
                    DbUtils.AddParameter(cmd, "@Name", nonProfit.Name);
                    DbUtils.AddParameter(cmd, "@Location", nonProfit.Location);
                    DbUtils.AddParameter(cmd, "@Cause", nonProfit.Cause);
                    DbUtils.AddParameter(cmd, "@Description", nonProfit.Description);
                    DbUtils.AddParameter(cmd, "@MissionStatement", nonProfit.MissionStatement);
                    DbUtils.AddParameter(cmd, "@Website", nonProfit.Website);

                    nonProfit.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(NonProfit nonProfit)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE NonProfit
                           SET OwnerId = OwnerId,
                               Name = @Name,
                               Location = @Location,
                               Cause = @Cause,
                               Description = @Description,
                               MissionStatement = @MissionStatement,
                               Website = @Website
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", nonProfit.Name);
                    DbUtils.AddParameter(cmd, "@Location", nonProfit.Location);
                    DbUtils.AddParameter(cmd, "@Cause", nonProfit.Cause);
                    DbUtils.AddParameter(cmd, "@Description", nonProfit.Description);
                    DbUtils.AddParameter(cmd, "@MissionStatement", nonProfit.MissionStatement);
                    DbUtils.AddParameter(cmd, "@Website", nonProfit.Website);
                    DbUtils.AddParameter(cmd, "@Id", nonProfit.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM NonProfit
                                        WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public NonProfit GetNonProfitById(int id)
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
                                         WHERE n.Id = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    NonProfit nonProfit = null;
                    if (reader.Read())
                    {
                        nonProfit = new NonProfit()
                         {
                             Id = DbUtils.GetInt(reader, "Id"),
                             OwnerId = DbUtils.GetInt(reader, "OwnerId"),
                             Name = DbUtils.GetString(reader, "Name"),
                             Location = DbUtils.GetString(reader, "Location"),
                             Cause = DbUtils.GetString(reader, "Cause"),
                             Description = DbUtils.GetString(reader, "Description"),
                             MissionStatement = DbUtils.GetString(reader, "MissionStatement"),
                             Website = DbUtils.GetString(reader, "website"),
                             UserProfile = new UserProfile()
                             {
                                 Id = DbUtils.GetInt(reader, "OwnerId"),
                                 FirstName = DbUtils.GetString(reader, "FirstName"),
                                 LastName = DbUtils.GetString(reader, "LastName"),
                                 DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                 Email = DbUtils.GetString(reader, "Email")
                             }
                         };
                    }

                    reader.Close();

                    return nonProfit;
                }
            }
        }

        public List<NonProfit> GetNonProfitByOwnerId(int ownerId)
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
                                         WHERE n.OwnerId = @OwnerId;";

                    DbUtils.AddParameter(cmd, "@OwnerId", ownerId);

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
                            UserProfile = new UserProfile()
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
