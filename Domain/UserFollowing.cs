using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class UserFollowing
    {
        public string ObserverId { get; set; }
        public string TargetId { get; set; }
        public virtual AppUser Observer { get; set; }   
        public virtual AppUser Target { get; set; }

        // Since there are 2 AppUser Foreign Key references here so there must be 2 entries of UserFollowing in AppUser. 
    }
}
