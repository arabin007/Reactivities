using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class AppUser: IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public virtual ICollection<UserActivity> UserActivities { get; set; }  // Specifies relation that one AppUser can have several entries in UserActivities table. IMPORTANT : This doesnt create any field on the AppUser table
        public virtual ICollection<Photo> Photos { get; set; }                 // Specifies relation that one AppUser can have several Photos. IMPORTANT : This doesnt create any field on the AppUser table
        public virtual  ICollection<UserFollowing> Followings { get; set; }
        public virtual  ICollection<UserFollowing> Followers { get; set; }
    }
}
