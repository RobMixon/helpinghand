using System.Collections.Generic;
using helpinghand.Models;

namespace helpinghand.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> ListAllUserProfiles();
    }
}