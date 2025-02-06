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
    public class PartCheckingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PartCheckingsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/PartCheckings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartChecking>>> GetPartChecking()
        {
            return await _context.PartChecking.ToListAsync();
        }

        // GET: api/PartCheckings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PartChecking>> GetPartChecking(int id)
        {
            var partChecking = await _context.PartChecking.FindAsync(id);

            if (partChecking == null)
            {
                return NotFound();
            }

            return partChecking;
        }

        // PUT: api/PartCheckings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartChecking(int id, PartChecking partChecking)
        {
            if (id != partChecking.PartCheckID)
            {
                return BadRequest();
            }

            _context.Entry(partChecking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartCheckingExists(id))
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

        // POST: api/PartCheckings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PartChecking>> PostPartChecking(PartChecking partChecking)
        {
            _context.PartChecking.Add(partChecking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPartChecking", new { id = partChecking.PartCheckID }, partChecking);
        }

        // DELETE: api/PartCheckings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePartChecking(int id)
        {
            var partChecking = await _context.PartChecking.FindAsync(id);
            if (partChecking == null)
            {
                return NotFound();
            }

            _context.PartChecking.Remove(partChecking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PartCheckingExists(int id)
        {
            return _context.PartChecking.Any(e => e.PartCheckID == id);
        }
    }
}
