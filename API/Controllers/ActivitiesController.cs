using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Detail(Guid id)
        {
            var test = await _mediator.Send(new Detail.Query() { Id = id});
            return test;
        }

        //[HttpPost]
        //public async Task<ActionResult<Unit>> Create()
        //{
        //    return await _mediator.Send(new Create.Command());  // This creates the activity but values are not passed along from json body.
        //}

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)  // This is implemented by [ApiController] of Create([fromBody]Create.Command command), this takes values from body and initializes the command properties inside Create.cs
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command() { Id = id });
        }
    }
}