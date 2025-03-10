﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Authorization;

namespace AngularApp1.Server.Controllers
{
    [Authorize(Policy = "AdminOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Projects>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Projects>> GetProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Projects project)
        {
            if (id != project.ProjectID)
            {
                return BadRequest();
            }

            project.UpdatedDate = DateTime.UtcNow;
            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Projects>> PostProject(Projects project)
        {
            project.Status = ProjectsStatusEnum.InDevelopment;

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.ProjectID }, project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.ProjectID == id);
        }

        [HttpGet("{id}/diagrams")]
        public async Task<ActionResult<IEnumerable<DiagramData>>> GetProjectDiagrams(int id)
        {
            var project = await _context.Projects.Include(p => p.Diagram).FirstOrDefaultAsync(p => p.ProjectID == id);

            if (project == null)
            {
                return NotFound();
            }

            return new List<DiagramData> { project.Diagram };
        }
    }
}
