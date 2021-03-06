from django.conf.urls import *
import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from django.contrib.staticfiles import views

urlpatterns = [
    # Example:
    # (r'^autoradio/', include('autoradio.foo.urls')),

#    (r'^xmms/', include('programs.urls')),
#    (r'^$', include('spots.urls')),
#    (r'^$', include('jingles.urls')),

#    Uncomment the next line to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

#    Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    url(r'^', include('autoradio.programs.urls')),
#    url(r'^', include('autoradio.palimpsest.urls')),
    url(r'^podcasts/', include('autoradio.programs.urls_podcast')),
    url(r'^player/', include('autoradio.player.urls')),
    url(r'^doc/', include('autoradio.doc.urls')),
]

if ( settings.SERVE_STATIC ):
#serve local static files
    urlpatterns += [
        url(r'^'+settings.MEDIA_PREFIX[1:]+'(.*)', views.serve, {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
        url(r'^'+settings.MEDIA_SITE_PREFIX[1:]+'(.*)', views.serve, {'document_root': settings.MEDIA_SITE_ROOT, 'show_indexes': True}),
    ]
