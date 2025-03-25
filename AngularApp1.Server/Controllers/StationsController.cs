using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Models;
using System.Reflection.Metadata;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Station>>> GetStationsByAssemblyLineID([FromQuery] int? AssemblyLineID)
        {
            try
            {
                IQueryable<Station> query = _context.Station;

                if (AssemblyLineID.HasValue)
                {
                    query = query.Where(al => al.AssemblyLineID == AssemblyLineID.Value);
                }

                var stations = await query.ToListAsync();
                if (stations == null || !stations.Any())
                {
                    return NotFound("No stations found");
                }
                return stations;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/Stations
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Station>>> GetStations()
        //{
        //    return await _context.Stations.ToListAsync();
        //}

        // GET: api/Stations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Station>> GetStation(int id)
        {
            var station = await _context.Station.FindAsync(id);

            if (station == null)
            {
                return NotFound();
            }

            return station;
        }

        // PUT: api/Stations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStation(int id, Station station)
        {
            if (id != station.StationID)
            {
                return BadRequest();
            }

            station.UpdatedDate = DateTime.UtcNow;
            _context.Entry(station).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StationExists(id))
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

        // POST: api/Stations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Station>> PostStation(Station station)
        {
            if (station.AssemblyLineID == 0)
            {
                return BadRequest("AssemlbyLineID is required.");
            }

            var assemblyLine = await _context.AssemblyLine.FindAsync(station.AssemblyLineID);
            if (assemblyLine == null)
            {
                return BadRequest("Invalid AssemblyLineID.");
            }

            _context.Station.Add(station);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStation", new { id = station.StationID }, station);
        }

        // DELETE: api/Stations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStation(int id)
        {
            var station = await _context.Station.FindAsync(id);
            if (station == null)
            {
                return NotFound();
            }

            _context.Station.Remove(station);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StationExists(int id)
        {
            return _context.Station.Any(e => e.StationID == id);
        }
    }
}
