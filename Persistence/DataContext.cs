﻿using Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistence
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions options) :base(options) 
        {

        }
        public DbSet<Value> tblValues { get; set; }
        public DbSet<Activity> tblActivities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Value>().HasData(
                new Value { Id = 1, Name = "Value1"},
                new Value { Id = 2, Name = "Value2"},
                new Value { Id = 3, Name = "Value3"}
                );
        }
    }
}