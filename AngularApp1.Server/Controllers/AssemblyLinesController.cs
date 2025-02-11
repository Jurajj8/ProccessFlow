using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssemblyLinesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AssemblyLinesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/AssemblyLine
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<AssemblyLine>>> GetAssemblyLine()
        //{
        //    return await _context.AssemblyLine.ToListAsync();
        //}

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssemblyLine>>> GetAssemblyLines([FromQuery] int? projectID)
        {
            try
            {
                IQueryable<AssemblyLine> query = _context.AssemblyLine;

                if (projectID.HasValue)
                {
                    query = query.Where(al => al.projectID == projectID.Value);
                }

                var assemblyLines = await query.ToListAsync();
                if (assemblyLines == null || !assemblyLines.Any())
                {
                    return NotFound("No assembly lines found");
                }
                return assemblyLines;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/AssemblyLine/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AssemblyLine>> GetAssemblyLine(int id)
        {
            var assemblyLine = await _context.AssemblyLine.FindAsync(id);

            if (assemblyLine == null)
            {
                return NotFound();
            }

            return assemblyLine;
        }

        // PUT: api/AssemblyLine/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> AssemblyLine(int id, AssemblyLine assemblyLine)
        {
            if (id != assemblyLine.lineID)
            {
                return BadRequest();
            }

            assemblyLine.dateEdited = DateTime.UtcNow;
            _context.Entry(assemblyLine).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssemblyLineExists(id))
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

        // POST: api/AssemblyLines
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AssemblyLine>> PostAssemblyLine(AssemblyLine assemblyLine)
        {
            if (assemblyLine.projectID == 0)
            {
                return BadRequest("ProjectID is required.");
            }

            var project = await _context.Projects.FindAsync(assemblyLine.projectID);
            if (project == null)
            {
                return BadRequest("Invalid ProjectID.");
            }

            _context.AssemblyLine.Add(assemblyLine);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssemblyLine", new { id = assemblyLine.lineID }, assemblyLine);
        }

        // DELETE: api/AssemblyLines/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssemblyLine(int id)
        {
            var assemblyLine = await _context.AssemblyLine.FindAsync(id);
            if (assemblyLine == null)
            {
                return NotFound();
            }

            _context.AssemblyLine.Remove(assemblyLine);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AssemblyLineExists(int id)
        {
            return _context.AssemblyLine.Any(e => e.lineID == id);
        }
    }
}
