using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize(Policy = "AdminOnly")]
[ApiController]
[Route("api/[controller]")]
public class DiagramsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<DiagramsController> _logger;

    public DiagramsController(AppDbContext context, ILogger<DiagramsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("{projectId}")]
    public async Task<ActionResult<DiagramData>> GetDiagram(int projectId)
    {
        var diagram = await _context.Diagram.FirstOrDefaultAsync(d => d.ProjectID == projectId);

        if (diagram == null)
        {
            return NotFound();
        }

        return diagram;
    }

    [HttpPost]
    public async Task<ActionResult<DiagramData>> SaveDiagram(DiagramData diagramData)
    {
        _logger.LogInformation("Received request to save diagram with ProjectID: {ProjectID}", diagramData.ProjectID);

        if (!ModelState.IsValid)
        {
            _logger.LogWarning("Model state is invalid: {ModelState}", ModelState);
            return BadRequest(ModelState);
        }

        var project = await _context.Project.Include(p => p.Diagram).FirstOrDefaultAsync(p => p.ProjectID == diagramData.ProjectID);
        if (project == null)
        {
            _logger.LogWarning("Invalid ProjectID: {ProjectID}", diagramData.ProjectID);
            return BadRequest("Invalid ProjectID");
        }

        try
        {
            if (project.Diagram != null)
            {
                project.Diagram.Name = diagramData.Name;
                project.Diagram.JsonData = diagramData.JsonData;
                _context.Entry(project.Diagram).State = EntityState.Modified;
            }
            else
            {
                project.Diagram = diagramData;
                _context.Diagram.Add(diagramData);
            }

            await _context.SaveChangesAsync();
            _logger.LogInformation("Diagram saved successfully with ID: {DiagramID}", diagramData.Id);
            return CreatedAtAction(nameof(GetDiagram), new { projectId = diagramData.ProjectID }, diagramData);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving diagram with ProjectID: {ProjectID}", diagramData.ProjectID);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDiagram(int id, DiagramData diagramData)
    {
        if (id != diagramData.Id)
        {
            return BadRequest();
        }

        _context.Entry(diagramData).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DiagramExists(id))
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

    private bool DiagramExists(int id)
    {
        return _context.Diagram.Any(e => e.Id == id);
    }
}