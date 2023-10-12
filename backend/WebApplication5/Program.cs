using Microsoft.EntityFrameworkCore;
using WebApplication5;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureEndpointDefaults(listenOptions =>
    {
    });
});


// Add services to the container.

builder.Services.AddControllers();
builder.WebHost.UseUrls("http://*:5074");
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer("server=db,1433;database=db;User Id=sa;Password=sSXf2q8gA6jQZ5;trusted_connection=false;Encrypt=False;Persist Security Info=False;"));

var app = builder.Build();
app.UseCors(x => x
               .AllowAnyMethod()
               .AllowAnyHeader()
               .SetIsOriginAllowed(origin => true)
               .AllowCredentials());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var db = app.Services.GetService<ApplicationDbContext>();
db.Database.EnsureCreated();
db.Database.Migrate();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
