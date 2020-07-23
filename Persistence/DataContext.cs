using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistence
{
    public class DataContext: IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) :base(options) 
        {
           
        }
        public DbSet<Value> tblValues { get; set; }
        public DbSet<Activity> tblActivities { get; set; }
        public DbSet<UserActivity> tblUsersActivities { get; set; }
        public DbSet<Photo> tblPhotos { get; set; }
        public DbSet<Comment> tblComments { get; set; }
        public DbSet<UserFollowing> tblUserFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);     //Added this after adding IdentityDbContext so that it can use string primary key automatically

            modelBuilder.Entity<Value>().HasData(
                new Value { Id = 1, Name = "Value1" },
                new Value { Id = 2, Name = "Value2" },
                new Value { Id = 3, Name = "Value3" }
                );

            modelBuilder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));    // Specifies that the combination of AppUserId and ActivityId will act as a primary key. There is no separate primary in UserActivity table.

            modelBuilder.Entity<UserActivity>()     // Specifying the relationship of entities in UserActivity Table for AppUser.
                .HasOne(u => u.AppUser)             // Read as: UserActivity table has an AppUser,
                .WithMany(ua => ua.UserActivities)  // That AppUser can have multiple entries in UserActivity Table,
                .HasForeignKey(u => u.AppUserId);   // With Principle table AppUser

            modelBuilder.Entity<UserActivity>()     // Specifying the relationship of entities in UserActivity Table for Activity.
                .HasOne(a => a.Activity)            // Read as: UserActivity table has an Activity,
                .WithMany(ua => ua.UserActivities)  // That Activity can have multiple entries in UserActivity Table,
                .HasForeignKey(a => a.ActivityId);  // With Principle table Activity

            modelBuilder.Entity<UserFollowing>()
                .HasKey(pk => new { pk.ObserverId, pk.TargetId });

            modelBuilder.Entity<UserFollowing>()
                .HasOne(o => o.Observer)
                .WithMany(ua => ua.Followings)
                .HasForeignKey(f => f.ObserverId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserFollowing>()    // Remembering Techique:
                .HasOne(t => t.Target)              // Foreign Identifier(ie. Target not TargetId) in the Entity(ie. UserFollowing class)
                .WithMany(ua => ua.Followers)       // Foreign Identifier(ie. Followers) in Principle Entity(ie. AppUser class)
                .HasForeignKey(f => f.TargetId)     // Foreign Key (ie. TargetId) in the Entity(ie. UserFollowing class)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
