using System.Data.Common;
using Amazon.S3;
using Amazon.S3.Util;
using Microsoft.EntityFrameworkCore;
using WebApplication5;
using WebApplication5.Interfaces;
using WebApplication5.Repositories;
using WebApplication5.Services;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureEndpointDefaults(listenOptions =>
    {
    });
});

builder.Services.AddControllers();
builder.WebHost.UseUrls("http://*:5074");
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddDbContext<WebApplication5.Data.ApplicationDbContext>(options =>
    options.UseSqlServer("server=localhost,1433;database=free-jam-db;User Id=sa;Password=sSXf2q8gA6jQZ5;trusted_connection=false;Encrypt=False;Persist Security Info=False;"))
                .AddTransient<IAlbumRepository, Repository>()
                .AddTransient<IChordRepository, Repository>()
                .AddTransient<ISongRepository, Repository>()
                .AddTransient<ISongProfileRepository, Repository>()
                .AddTransient<IAlbumService, AlbumService>()
                .AddTransient<ISongProfileService, SongProfileService>()
                .AddTransient<IChordService, ChordService>()
                .AddTransient<ISongService, SongService>();

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

using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetService<WebApplication5.Data.ApplicationDbContext>();
if (db == null)
{
    throw new Exception("Couldn't migrate database");
}

// Create and migrate the database if it does not exist
// if (!db.Database.EnsureCreated()) {

//     // The database already exists. Just migrate it.
//     db.Database.Migrate();
// }

// Ensure all the required S3 buckets are configured correctly

// var credentials = new Amazon.Runtime.BasicAWSCredentials("root", "password");
// var s3Client = new AmazonS3Client(credentials, new AmazonS3Config{
//     ServiceURL= "http://bucket:9000",
// });
// Console.WriteLine("Create buckets");
// var bucketName = "album-covers";

// var res = await s3Client.ListBucketsAsync();
// Console.WriteLine(res);

// if (!await AmazonS3Util.DoesS3BucketExistV2Async(s3Client, bucketName)){
//     await s3Client.PutBucketAsync(new Amazon.S3.Model.PutBucketRequest
//     {
//         BucketName = bucketName,
//     });
//     Console.WriteLine($"Bucket '{bucketName}' created successfully.");
// } else {
//     Console.WriteLine($"Bucket '{bucketName} already exists, skipping creation.");
// }

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
