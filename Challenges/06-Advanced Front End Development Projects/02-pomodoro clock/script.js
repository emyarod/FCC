$('#session-control').change((event) => {
  const session = moment($(event.currentTarget).val(), 'mm');
  $('#time').text(session.format('mm:ss'));
});

$('#start').click((event) => {
  // disable button
  $(event.currentTarget).prop('disabled', true);

  // change button text
  $('#start').text('session!');

  let sessionLength = moment.duration(Number($('#session-control').val()), 'minutes');
  const startSessionInterval = (start) => {
    // reset session length
    sessionLength = moment.duration(Number($('#session-control').val()), 'minutes');

    // change button and duration text
    $('#start').text('session!');
    $('#time').text(sessionLength.format('mm:ss', { trim: false }));

    // set interval
    const sessionInterval = setInterval(() => {
      if (sessionLength._milliseconds === 0) {
        clearInterval(sessionInterval);
        start(startSessionInterval);
        return;
      }

      sessionLength.subtract(1, 's');
      $('#time').text(sessionLength.format('mm:ss', { trim: false }));
    }, 1000);
  };

  let breakLength = moment.duration(Number($('#break-control').val()), 'minutes');
  const startBreakInterval = (start) => {
    // reset break length
    breakLength = moment.duration(Number($('#break-control').val()), 'minutes');

    // change button and duration text
    $('#start').text('break!');
    $('#time').text(breakLength.format('mm:ss', { trim: false }));

    // set interval
    const breakInterval = setInterval(() => {
      if (breakLength._milliseconds === 0) {
        clearInterval(breakInterval);
        start(startBreakInterval);
        return;
      }

      breakLength.subtract(1, 's');
      $('#time').text(breakLength.format('mm:ss', { trim: false }));
    }, 1000);
  };

  startSessionInterval(startBreakInterval);
});
