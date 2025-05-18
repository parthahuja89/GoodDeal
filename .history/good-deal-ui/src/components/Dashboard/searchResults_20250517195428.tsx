"use client"


// interface SearchResultsProps {
//   searchQuery?: string
//   results?: Game[]
//   onSelectGame?: (game: Game) => void
// }
// Temporary data
const results = [
  {
    title: "Cyberpunk 2077",
    id: "018d937f-2997-7131-b8b9-7c8af4825fa8",
    asset_url: "https://assets.isthereanydeal.com/018d937f-2997-7131-b8b9-7c8af4825fa8/banner600.jpg?t=1746524713",
  },
  {
    title: "VA-11 Hall-A: Cyberpunk Bartender Action",
    id: "018d937f-2998-7044-874d-26ecb30c4e4b",
    asset_url: "https://assets.isthereanydeal.com/018d937f-2998-7044-874d-26ecb30c4e4b/banner600.jpg?t=1732216812",
  },
  {
    title: "E.Y.E: Divine Cybermancy",
    id: "01939826-74c9-7352-9adc-79f40dfa92b2",
    asset_url: "https://assets.isthereanydeal.com/01939826-74c9-7352-9adc-79f40dfa92b2/banner600.jpg?t=1733437583",
  },
  {
    title: "Bomb Rush Cyberfunk",
    id: "018d937f-443d-7383-bede-c4e0d42b7cfd",
    asset_url: "https://assets.isthereanydeal.com/018d937f-443d-7383-bede-c4e0d42b7cfd/banner600.jpg?t=1732737306",
  },
  {
    title: "Cyberpunk 2077: Phantom Liberty",
    id: "018d937f-6ed7-7164-8fc3-5390f976e531",
    asset_url: "https://assets.isthereanydeal.com/018d937f-6ed7-7164-8fc3-5390f976e531/banner600.jpg?t=1746524721",
  },
]

export default function SearchResults() {
  return (
    <div className="w-full bg-gray-800 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {results.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {results.map((game) => (
            <li
              key={game.id}
              className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              
            >
              <div className="flex items-center p-4">
                <div className="h-16 w-28 relative flex-shrink-0 rounded-md overflow-hidden">
                  <img
                    src={game.asset_url}
                    alt={game.title}
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{game.title}</p>
                  <p className="text-xs text-gray-500 mt-1">ID: {game.id.substring(0, 8)}...</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-6 px-4 text-center">
          <p className="text-gray-500">No results found for "...."</p>
        </div>
      )}
    </div>
  )
}


