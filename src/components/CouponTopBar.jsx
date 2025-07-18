import { Box, Flex, Button } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import Text from './Text';
import Timer from './Timer';
import useStyle from '../hooks/useStyle';
import signupAction from '../store/actions/signupAction';
import useSignup from '../hooks/useSignup';
import { useBootcamp } from '../pages/bootcamp/useBootcamp';

function CouponTopBar({ ...rest }) {
  const { t } = useTranslation('course');
  const { hexColor } = useStyle();
  const { setSelfAppliedCoupon } = signupAction();
  const { getPriceWithDiscount, state } = useSignup();
  const { selfAppliedCoupon } = state;
  const { enrollQuerys, router } = useBootcamp();

  // Since we are not showing the price after discount, we can give the price as cero
  const { discount } = getPriceWithDiscount(0, selfAppliedCoupon);

  const differenceInWeeks = (date1, date2) => {
    // Convert both dates to milliseconds
    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1Ms - date2Ms);

    // Convert the difference to weeks
    // const differenceWeeks = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 7));
    const differenceWeeks = differenceMs / (1000 * 60 * 60 * 24 * 7);

    return differenceWeeks;
  };

  const addWeeks = (date, weeks) => {
    date.setDate(date.getDate() + 7 * weeks);
    return date;
  };

  if (!selfAppliedCoupon) return null;

  const initialReferenceDate = new Date('2024-04-01');
  const now = new Date();
  const referenceDate = addWeeks(
    initialReferenceDate,
    Math.ceil(differenceInWeeks(initialReferenceDate, now) / 2) * 2,
  );

  return (
    <Box
      background={hexColor.green}
      padding="8px 10px"
      {...rest}
    >
      <Box maxWidth="1280px" margin="auto" display="flex" justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" justifyContent="center" gap="10px" flexDirection="row" flexWrap="wrap">
          <Text color="#FFF" fontSize={{ base: '12px', md: '18px' }} fontFamily="inter">
            {t('coupon-bar.headline', { discount })}
          </Text>
          <Flex gap="10px">
            <Text color="#FFF" fontSize={{ base: '12px', md: '17px' }} fontFamily="inter" fontWeight="900">
              {t('coupon-bar.ends-in', { time: '' })}
            </Text>
            <Timer
              autoRemove
              variant="text"
              startingAt={referenceDate.toISOString()}
              onFinish={() => setSelfAppliedCoupon(null)}
              color="white"
              background="none"
              fontSize={{ base: '12px', md: '17px' }}
              fontFamily="inter"
              fontWeight="900"
            />
          </Flex>
        </Flex>
        <Button
          minWidth="100px"
          variant="default"
          background="white"
          padding="8px"
          color={hexColor.green}
          borderRadius="3px"
          fontWeight="bold"
          onClick={() => router.push(`/checkout${enrollQuerys}`)}
        >
          <Text size="auto" style={{ textWrap: 'nowrap' }}>
            {`${t('coupon-bar.see-prices')} →`}
          </Text>
        </Button>
      </Box>
    </Box>
  );
}

export default CouponTopBar;
