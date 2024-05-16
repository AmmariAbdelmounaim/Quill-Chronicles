// export async function POST(request: Request) {
//   const body = await request.json();
//   const { searchParams } = new URL(request.url);
//   const { titleFilter } = body;

//   const page = parseInt(searchParams.get("page") ?? "0");

//   // Combine filters into a single pass to improve efficiency
//   const filteredArticles = randomCandidates.filter((candidate) => {
//     return (
//       (!nameFilter ||
//         candidate.profile.name
//           .toLowerCase()
//           .includes(nameFilter.toLowerCase())) &&
//       (jobTitleFilter.length === 0 ||
//         jobTitleFilter.includes(candidate.jobTitle)) &&
//       (locationFilter.length === 0 ||
//         locationFilter.includes(candidate.location)) &&
//       (industriesFilter.length === 0 ||
//         industriesFilter.includes(candidate.industrie)) &&
//       (experienceFilter.length === 0 ||
//         experienceFilter.includes(candidate.profile.experience))
//     );
//   });

//   // Sort filtered candidates
//   const sortedCandidates = filteredCandidates.sort((a, b) => {
//     let comparison = 0;

//     if (sortField === "name") {
//       comparison = a.profile.name.localeCompare(b.profile.name);
//     } else if (sortField === "cvQuality") {
//       // Ensure consistent sorting by converting CvQuality to numbers if needed
//       comparison = a.cvQuality.localeCompare(b.cvQuality);
//     } else if (sortField === "dateAdded") {
//       comparison =
//         new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
//     }

//     // Reverse the comparison for descending order
//     return sortOrder === "desc" ? -comparison : comparison;
//   });

//   const startIndex = page * limit;
//   const endIndex = startIndex + limit;
//   const paginatedCandidates = sortedCandidates.slice(startIndex, endIndex);

//   // Use filteredCandidates.length for accurate pagination
//   const pageCount = Math.ceil(sortedCandidates.length / limit);

//   return Response.json({
//     candidates: paginatedCandidates,
//     pagination: {
//       rowCount: sortedCandidates.length,
//       pageCount,
//       pageIndex: page,
//       pageSize: limit,
//     },
//   });
// }
