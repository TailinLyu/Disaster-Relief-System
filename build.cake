// Modules
#module nuget:?package=Cake.DotNetTool.Module&version=0.3.1

// Tools
#tool dotnet:?package=trx2junit&version=1.2.6

// Addins
#addin nuget:?package=NuGet.Core&version=2.14.0

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Debug");

var artifactsDir = Directory("./Artifacts");
var artifactsPath = MakeAbsolute(artifactsDir).FullPath;
var publishedOutputPath = MakeAbsolute(artifactsDir + Directory("Published")).FullPath;
var artifactsTestOutputDir = MakeAbsolute(artifactsDir + Directory("TestResults"));
var solutionFile = File("./DisasterReliefApplication/DisasterReliefApplication.sln");
var unitTestProjFile = "./DisasterReliefApplication/UnitTests/UnitTests.csproj";
var unitTestsDLL = File("./DisasterReliefApplication/UnitTests/bin/" + configuration + "/netcoreapp3.1/UnitTests.dll");

Setup(context => 
{
    Information("Configuration is {0}", configuration);
});

Task("Clean-Output")
    .Does(() => 
    {
        EnsureDirectoryExists(artifactsDir);
        CleanDirectory(artifactsDir);
    });

Task("Clean-Solution")
    .IsDependentOn("Clean-Output")
    .Does(() =>
    {
        DotNetCoreClean(solutionFile);
    });

Task("Restore-NuGet-Packages")
    .IsDependentOn("Clean-Solution")
    .Does(() => 
    {
        DotNetCoreRestore(solutionFile);
    });

Task("Build")
    .IsDependentOn("Restore-NuGet-Packages")
    .Does(() => 
    {
        DotNetCoreBuild(solutionFile, new DotNetCoreBuildSettings() {
            Configuration = configuration,
            NoIncremental = true,
            NoRestore = true,
            MSBuildSettings = new DotNetCoreMSBuildSettings()
                .WithProperty("DeployOnBuild", "False")
        });
    });

Task("Run-Unit-Tests")
    .IsDependentOn("Build")
    .Does(() => 
    {
        try
        {
            var testResults = MakeAbsolute(artifactsTestOutputDir.CombineWithFilePath("UnitTestResults.trx"));

            DotNetCoreTest(unitTestProjFile, new DotNetCoreTestSettings {
                Framework = "netcoreapp3.1",
                Configuration = configuration,
                NoBuild = true,
                NoRestore = true,
                ArgumentCustomization = args => args.Append($"--logger trx;LogFileName=\"{testResults}\"")
            });
        }
        finally
        {
            StartProcess("./tools/trx2junit", $"\"{artifactsTestOutputDir}/UnitTestResults.trx\" --output \"{artifactsTestOutputDir}\"");
        }
    });

Task("Default")
    .IsDependentOn("Run-Unit-Tests");

RunTarget(target);