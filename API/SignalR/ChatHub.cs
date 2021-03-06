﻿using Microsoft.AspNetCore.SignalR;
using MediatR;
using System.Threading.Tasks;
using Application.Comments;
using System.Linq;
using System.Security.Claims;

namespace API.SignalR
{
    public class ChatHub: Hub                   //Hub provided by SignalR
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var username = Context.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;

            command.Username = username;

            var comment = await _mediator.Send(command);

            await Clients.All.SendAsync("ReceiveComment", comment);
        }
    }
}
