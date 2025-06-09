using Playground.Cart.Data;
using Playground.Cart.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add EF Core DbContext with connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Server=(localdb)\\mssqllocaldb;Database=PlaygroundCartDb;Trusted_Connection=True;";
builder.Services.AddDbContext<CartDbContext>(options =>
    options.UseSqlServer(connectionString));

// JWT Authentication configuration
var jwtKey = builder.Configuration["Jwt:Key"] ?? "SampleSuperSecretKey123!@#SampleSuperSecretKey123!@#";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "SampleIssuer";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudiences = new[] { "cart_api", "catalog_api", "wishlist_api" },
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromMinutes(5), // Allow for clock skew
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer, // Should match "SampleIssuer"
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)) // Should match the signing key
    };
    // Add logging for validation failures
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            Console.WriteLine("Token validated successfully.");
            return Task.CompletedTask;
        },
        OnChallenge = context =>
        {
            Console.WriteLine("Authentication challenge triggered.");
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();
builder.Services.AddControllers(); // Added this line to resolve the missing services error

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
