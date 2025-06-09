using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add EF Core
builder.Services.AddDbContext<Playground.Catalog.Data.CatalogDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Dependency Injection for repositories and services
builder.Services.AddScoped<Playground.Catalog.Data.Repositories.IProductRepository, Playground.Catalog.Data.Repositories.ProductRepository>();
builder.Services.AddScoped<Playground.Catalog.Services.ProductService>();

// Add Authentication/Authorization (JWT)
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
            ValidateAudience = true, // Set to true to validate audiences
        ValidAudiences = new[] { "cart_api", "catalog_api", "wishlist_api" }, // List all valid audiences
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});
builder.Services.AddAuthorization();
builder.Services.AddControllers(); // Added this line to resolve the missing services error
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
