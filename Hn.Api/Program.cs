using Hn.Api.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowDev", p => p
        .WithOrigins("http://localhost:4200", "https://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod());
});builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "HN API", Version = "v1" });
});

builder.Services.AddCors(o =>
{
    o.AddPolicy("AllowWeb", p =>
        p.WithOrigins("http://localhost:4200", "https://localhost:4200")
         .AllowAnyHeader()
         .AllowAnyMethod()
    );
});

builder.Services.AddMemoryCache();
builder.Services.AddHttpClient<IHnClient, HnClient>(client =>
{
    client.BaseAddress = new Uri("https://hacker-news.firebaseio.com/");
    client.Timeout = TimeSpan.FromSeconds(10);
});
builder.Services.AddScoped<IStoryService, StoryService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");
}

app.UseCors("AllowWeb");
app.MapControllers();

app.Run();

public partial class Program { } // enables WebApplicationFactory if you add integration tests later



