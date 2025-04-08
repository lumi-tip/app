import {
  Box, Input, Button, Container, Text, InputGroup, InputRightElement, useColorModeValue, Skeleton,
} from '@chakra-ui/react';
import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Icon from '../../common/components/Icon';
import useStyle from '../../common/hooks/useStyle';
import bc from '../../common/services/breathecode';
import useAuth from '../../common/hooks/useAuth';
import useCustomToast from '../../common/hooks/useCustomToast';

const ModalToCloneProject = lazy(() => import('../../common/components/GuidedExperience/ModalToCloneProject'));

export default function StartPage() {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const [assetData, setAssetData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [provisioningVendors, setProvisioningVendors] = useState([]);

  const router = useRouter();
  const { asset } = router.query;
  const { hexColor } = useStyle();
  const { user, isAuthenticated, cohorts } = useAuth();
  const { createToast } = useCustomToast({ toastId: 'start-page-toast' });

  const fetchVendorsForUser = useCallback(async () => {
    if (!isAuthenticated || !cohorts || cohorts.length === 0) {
      return [];
    }
    let foundVendors = [];
    let found = false;
    await cohorts.reduce(async (previousPromise, cohort) => {
      await previousPromise;
      if (found || foundVendors.length > 0) return;
      if (cohort.academy?.id) {
        try {
          const academyId = cohort.academy.id;
          const { data } = await bc.provisioning().academyVendors(academyId);
          console.log('data', data);
          if (data && data.length > 0) {
            foundVendors = data;
            found = true;
          }
        } catch (e) {
          console.error('Error fetching asset data:', e);
        }
      }
    }, Promise.resolve());
    return foundVendors;
  }, [isAuthenticated, cohorts]);

  const fetchAssetAndVendors = useCallback(async (assetSlug) => {
    setIsLoading(true);
    setAssetData(null);
    setProvisioningVendors([]);
    setShowModal(false);
    try {
      const assetResp = await bc.lesson().getAsset(assetSlug);
      const fetchedAsset = assetResp?.data;
      if (fetchedAsset?.status_code >= 400 || !fetchedAsset) {
        throw new Error(`Project slug '${assetSlug}' not found or is invalid.`);
      }
      setAssetData(fetchedAsset);
      const vendors = await fetchVendorsForUser();
      setProvisioningVendors(vendors);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching asset data:', err);
      createToast({
        status: 'error',
        title: 'Error Loading Project',
        description: err.message || 'Failed to load project data.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchVendorsForUser]);

  useEffect(() => {
    setIsLoading(false);
    setShowModal(false);
    setAssetData(null);
    setProvisioningVendors([]);

    if (asset) {
      const assetSlug = Array.isArray(asset) ? asset[0] : asset;
      setSearchInput(assetSlug);
      fetchAssetAndVendors(assetSlug);
    } else {
      setSearchInput('');
    }
  }, [asset, fetchAssetAndVendors]);

  const handleSearch = (e) => {
    e.preventDefault();
    const input = searchInput.trim();
    if (!input) return;

    setIsLoading(false);
    setShowModal(false);
    setAssetData(null);

    router.push(`/start?asset=${encodeURIComponent(input)}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/start', undefined, { shallow: true });
  };

  const headingColor = useColorModeValue('black', 'white');

  const shouldRenderModal = showModal && !isLoading && assetData;

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Container maxW="container.md" py={10} flex="1" display="flex" flexDirection="column" alignItems="center">

        <Box width="100%" display="flex" flexDirection="column" alignItems="center" mb={8}>
          <Box mb={8}>
            <Icon
              icon="4GeeksIcon"
              width="196px"
              height="42px"
              color={hexColor.blueDefault}
            />
          </Box>
          <Text fontSize="2xl" fontWeight="bold" mb={6} color={headingColor} textAlign="center">
            Start working on your project
          </Text>
          <Box as="form" onSubmit={handleSearch} width="100%" maxW="600px">
            <InputGroup size="lg">
              <Input
                placeholder={t('common:start-placeholder')}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                borderColor={hexColor.borderColor}
                _hover={{ borderColor: hexColor.blueDefault }}
                _focus={{ borderColor: hexColor.blueDefault, boxShadow: `0 0 0 1px ${hexColor.blueDefault}` }}
                borderRadius="md"
                height="60px"
                fontSize="md"
              />
              <InputRightElement width="5.5rem" height="60px">
                <Button
                  h="40px"
                  type="submit"
                  bg={hexColor.blueDefault}
                  color="white"
                  _hover={{ bg: 'blue.600' }}
                  mr={1}
                  isLoading={isLoading}
                >
                  {t('common:search')}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>

        {isLoading && (
          <Box width="100%" maxW="600px" mt={4}>
            <Skeleton height="60px" borderRadius="md" />
            <Skeleton height="20px" mt={4} width="80%" />
            <Skeleton height="20px" mt={2} width="60%" />
          </Box>
        )}

        {shouldRenderModal && (
          <Suspense fallback={<Skeleton height="400px" width="100%" mt={4} borderRadius="md" />}>
            <ModalToCloneProject
              currentAsset={assetData}
              isOpen={showModal}
              onClose={handleCloseModal}
              provisioningVendors={assetData ? provisioningVendors : []}
              publicView
              userID={user?.id}
            />
          </Suspense>
        )}

      </Container>
    </Box>
  );
}
