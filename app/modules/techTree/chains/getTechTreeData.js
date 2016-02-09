import createDependencySlotTree from '../actions/createDependencySlotTree';
import getTiers from '../actions/getTiers';
import setTiers from '../actions/setTiers';
import showSnackbar from 'common/factories/actions/showSnackbar';
import updateCourses from '../actions/updateCourses';
import setSelectedTierIndex from '../actions/setSelectedTierIndex';
import getCoursesInSelectedTier from '../actions/getCoursesInSelectedTier';
import setTierCoursesLoaded from '../actions/setTierCoursesLoaded';
import tierCoursesAreLoaded from '../actions/tierCoursesAreLoaded';
import setAllTiersLoaded from '../actions/setAllTiersLoaded';
import isAdmin from '../actions/isAdmin';
import getAllCourses from '../actions/getAllCourses';
import allTiersAreLoaded from '../actions/allTiersAreLoaded';
import tiersExists from '../actions/tiersExists';
import getMainAssignment from 'modules/mainAssignment/actions/getMainAssignment';
import setMainAssignment from 'modules/mainAssignment/actions/setMainAssignment';
import createMainAssignment from 'modules/mainAssignment/actions/createMainAssignment';
import set from 'common/factories/actions/set';

export default [
  [
    getTiers, {
      success: [
        setTiers,
        isAdmin, {
          true: [
            allTiersAreLoaded, {
              true: [
                setSelectedTierIndex,
                createDependencySlotTree
              ],
              false: [
                [
                  getAllCourses, {
                    success: [
                      updateCourses,
                      setTierCoursesLoaded,
                      setAllTiersLoaded,
                      setSelectedTierIndex,
                      createDependencySlotTree,
                      showSnackbar('Tech treet er lastet')
                    ],
                    error: [showSnackbar('Det oppstod en feil ved henting av kurs!')]
                  }
                ]
              ]
            }
          ],
          false: [
            tiersExists, {
              true: [
                tierCoursesAreLoaded, {
                  true: [
                    setSelectedTierIndex,
                    createDependencySlotTree
                  ],
                  false: [
                    [
                      getCoursesInSelectedTier, {
                        success: [
                          updateCourses,
                          setTierCoursesLoaded,
                          setSelectedTierIndex,
                          createDependencySlotTree,
                          showSnackbar('Tech treet er lastet')
                        ],
                        error: [showSnackbar('Det oppstod en feil ved henting av kurs!')]
                      }
                    ]
                  ]
                }
              ],
              false: [
                createDependencySlotTree
              ]
            }
          ]
        },
        [
          getMainAssignment, {
            success: [
              setMainAssignment,
              set(['mainAssignment', 'existingAssignment'], true)
            ],
            error: []
          }
        ]
      ],
      error: [showSnackbar('Innlasting av Tech treet feilet!')]
    }
  ]
];
