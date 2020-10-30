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
    public class NeedRepository : BaseRepository, INeedRepository
    {
        public NeedRepository(IConfiguration configuration) : base(configuration) { }

        public List<Need> GetAllNeeds()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT n.Id, n.NonProfitId, n.Item, n.Quantity, n.Description, n.Location,
                                   np.OwnerId, np.Name, np.Location, np.Cause, np.Description, np.MissionStatement,
                                   np.Website
                            FROM Need n
                            LEFT JOIN NonProfit np on n.NonProfitId = np.Id
                                       ";
                    var reader = cmd.ExecuteReader();

                    var needs = new List<Need>();

                    while (reader.Read())
                    {
                        needs.Add(new Need()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            NonProfitId = DbUtils.GetInt(reader, "NonProfitId"),
                            Item = DbUtils.GetString(reader, "Item"),
                            Quantity = DbUtils.GetString(reader, "Quantity"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Location = DbUtils.GetString(reader, "Location"),
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

                    return needs;
                }
            }
        }
        //add
        public void Add(Need need)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Need (NonProfitId, Item, Quantity, Description, 
                                          Location)
                        OUTPUT INSERTED.ID
                        VALUES (@NonProfitId, @item, @Quantity, @Description,
                                 @Location)";

                    DbUtils.AddParameter(cmd, "@NonProfitId", need.NonProfitId);
                    DbUtils.AddParameter(cmd, "@Item", need.Item);
                    DbUtils.AddParameter(cmd, "@Quantity", need.Quantity);
                    DbUtils.AddParameter(cmd, "@Description", need.Description);
                    DbUtils.AddParameter(cmd, "@Location", need.Location);

                    need.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        //update
        public void Update(Need need)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Need
                           SET NonProfitId = @NonProfitId,
                               Item = @Item,
                               Quantity = @Quantity,
                               Description = @Description,
                               Location = @Location
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@NonProfitId", need.NonProfitId);
                    DbUtils.AddParameter(cmd, "@Item", need.Item);
                    DbUtils.AddParameter(cmd, "@Quantity", need.Quantity);
                    DbUtils.AddParameter(cmd, "@Description", need.Description);
                    DbUtils.AddParameter(cmd, "@Location", need.Location);
                    DbUtils.AddParameter(cmd, "@Id", need.Id);

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
                                        DELETE FROM Need
                                        WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        //get by id
        public Need GetNeedById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT n.Id, n.NonProfitId, n.Item, n.Quantity, n.Description, n.Location,
                                   np.OwnerId, np.Name, np.Location, np.Cause, np.Description, np.MissionStatement,
                                   np.Website
                            FROM Need n
                            LEFT JOIN NonProfit np on n.NonProfitId = np.Id
                                        WHERE n.Id = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Need need = null;
                    if (reader.Read())
                    {
                        need = new Need()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            NonProfitId = DbUtils.GetInt(reader, "NonProfitId"),
                            Item = DbUtils.GetString(reader, "Item"),
                            Quantity = DbUtils.GetString(reader, "Quantity"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Location = DbUtils.GetString(reader, "Location"),
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

                    return need;
                }
            }
        }
        //get need by NonProfitid
        public List<Need> GetByNonProfitId(int NonProfitId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT n.Id, n.NonProfitId, n.Item, n.Quantity, n.Description, n.Location,
                                   np.OwnerId, np.Name, np.Location, np.Cause, np.Description, np.MissionStatement,
                                   np.Website
                            FROM Need n
                            LEFT JOIN NonProfit np on n.NonProfitId = np.Id
                                        WHERE n.NonProfitId = @NonProfitId;";

                    DbUtils.AddParameter(cmd, "@NonProfitId", NonProfitId);

                    var reader = cmd.ExecuteReader();

                    var needs = new List<Need>();
                    while (reader.Read())
                    {
                        needs.Add(new Need()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            NonProfitId = DbUtils.GetInt(reader, "NonProfitId"),
                            Item = DbUtils.GetString(reader, "Item"),
                            Quantity = DbUtils.GetString(reader, "Quantity"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Location = DbUtils.GetString(reader, "Location"),
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

                    return needs;
                }
            }
        }
    }
}
