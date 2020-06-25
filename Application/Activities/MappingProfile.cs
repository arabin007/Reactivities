using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Activities
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDTO>();
            CreateMap<UserActivity, AttendeeDTO>()
                    .ForMember(dest => dest.Username, o => o.MapFrom(sourc => sourc.AppUser.UserName))
                    .ForMember(dest => dest.DisplayName, o => o.MapFrom(sourc => sourc.AppUser.DisplayName));
        }
    }
}
